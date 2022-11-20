package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

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
			Path:      filePath[8:], // 8 chars of -> ./clones/
			Childrens: []*File{},
		}
		if !f.IsDir() {
			fileExts := strings.Split(f.Name(), ".")
			file.Extension = fileExts[len(fileExts)-1]
			content, err := ioutil.ReadFile(filePath)
			if err != nil {
				fmt.Println(err.Error())
			}
			file.Content = string(content)
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

func main() {
	r := gin.Default()

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
		rnd := strconv.Itoa(int(time.Now().Unix()))
		cmd := exec.Command("git", "clone", "--depth", "1", r.Url, "./clones/"+rnd)
		err = cmd.Run()
		if err != nil {
			fmt.Printf(err.Error())
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Repo is not correct"})
			return
		}
		os.RemoveAll("./clones/" + rnd + "/.git")
		json, err := dirTree("./clones/" + rnd)
		if err != nil {
			fmt.Printf(err.Error())
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "failed to parse repo"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"data": json})
	})

	r.Run()
}
