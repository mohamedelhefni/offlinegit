package main

import (
	"io"
	"net/http"
	"net/url"
	"offgit/types"
	"offgit/utils"
	"os"
	"os/exec"

	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

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
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	// Disable Console Color, you don't need console color when writing the logs to file.
	gin.DisableConsoleColor()

	// Logging to a file.
	f, _ := os.Create("gin.log")
	gin.DefaultWriter = io.MultiWriter(f)

	r := gin.Default()
	r.Use(gzip.Gzip(gzip.DefaultCompression))
	r.Use(CORSMiddleware())
	r.POST("/repo", func(c *gin.Context) {
		var r types.RepoRequest
		var err error
		if err := c.BindJSON(&r); err != nil {
			log.Err(err).Msg("failed to parse request")
			c.Status(http.StatusBadRequest)
			return
		}
		_, err = url.Parse(r.Url)
		if err != nil {
			log.Err(err).Msg("failed to parse url")
			c.Status(http.StatusBadRequest)
			return
		}
		log.Debug().Str("Url", r.Url).Send()
		hash := utils.Md5Hash(r.Url)
		if _, err := os.Stat("./clones/" + hash); os.IsNotExist(err) {
			cmd := exec.Command("git", "clone", "--depth", "1", r.Url, "./clones/"+hash)
			err = cmd.Run()
			if err != nil {
				log.Err(err).Msg("failed to clone repo")
				c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Repo is not correct"})
				return
			}
			os.RemoveAll("./clones/" + hash + "/.git")
		}
		json, err := utils.DirTree("./clones/" + hash)
		if err != nil {
			log.Err(err).Msg("failed to extract dir tree")
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "failed to parse repo"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"data": gin.H{"files": json}, "hash": hash})
	})

	r.Run()
}
