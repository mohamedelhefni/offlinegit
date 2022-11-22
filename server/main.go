package main

import (
	"crypto/md5"
	"encoding/base64"
	"encoding/hex"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"os/exec"
	"strings"

	"github.com/gin-gonic/gin"
)

var imgExtensions []string = []string{"jpg", "jpeg", "png", "gif"}

type RepoRequest struct {
	Url string `json:"url,required"`
}

type File struct {
	IsDir     bool    `json:"isDir"`
	Name      string  `json:"name,omitempty"`
	Path      string  `json:"path,omitempty"`
	Extension string  `json:"extension,omitempty"`
	Content   string  `json:"content,omitempty"`
	Childrens []*File `json:"childrens,omitempty"`
}

func contains(s []string, str string) bool {
	for _, v := range s {
		if v == str {
			return true
		}
	}

	return false
}

func dirTree(path string) ([]*File, error) {
	var mainFiles []*File
	files, err := os.ReadDir(path)
	if err != nil {
		return []*File{}, err
	}
	for _, f := range files {
		filePath := fmt.Sprintf("%s/%s", path, f.Name())
		file := File{
			IsDir:     f.IsDir(),
			Name:      f.Name(),
			Path:      filePath[9:], // 8 chars of -> ./clones/
			Childrens: []*File{},
		}
		if !f.IsDir() {
			fileExts := strings.Split(f.Name(), ".")
			extension := fileExts[len(fileExts)-1]
			file.Extension = extension
			content, err := ioutil.ReadFile(filePath)
			if err != nil {
				fmt.Println(err.Error())
			}
			if contains(imgExtensions, extension) {
				base := base64.RawStdEncoding.EncodeToString(content)
				file.Content = fmt.Sprintf("data:image/%s;base64,%s", extension, base)
			} else {
				file.Content = string(content)
			}

		}

		if f.IsDir() {
			nested, err := dirTree(path + "/" + f.Name())
			if err != nil {
				fmt.Println(err.Error())
			}
			file.Childrens = nested
		}

		mainFiles = append(mainFiles, &file)
	}
	return mainFiles, nil
}

func Md5Hash(text string) string {
	hasher := md5.New()
	hasher.Write([]byte(text))
	return hex.EncodeToString(hasher.Sum(nil))
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {

	gin.DisableConsoleColor()
	f, _ := os.Create("gin.log")
	gin.DefaultWriter = io.MultiWriter(f)
	r := gin.Default()
	r.Use(CORSMiddleware())
	r.POST("/repo", func(c *gin.Context) {
		var r RepoRequest
		var err error
		if err := c.BindJSON(&r); err != nil {
			fmt.Printf(err.Error())
			c.Status(http.StatusBadRequest)
			return
		}
		_, err = url.Parse(r.Url)
		if err != nil {
			fmt.Printf(err.Error())
			c.Status(http.StatusBadRequest)
			return
		}
		fmt.Println(r.Url)
		hash := Md5Hash(r.Url)
		if _, err := os.Stat("./clones/" + hash); os.IsNotExist(err) {
			cmd := exec.Command("git", "clone", "--depth", "1", r.Url, "./clones/"+hash)
			err = cmd.Run()
			if err != nil {
				fmt.Printf(err.Error())
				c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Repo is not correct"})
				return
			}
			os.RemoveAll("./clones/" + hash + "/.git")
		}
		json, err := dirTree("./clones/" + hash)
		if err != nil {
			fmt.Printf(err.Error())
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "failed to parse repo"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"data": gin.H{"files": json}, "hash": hash})
	})

	r.Run()
}
