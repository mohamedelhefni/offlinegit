package utils

import (
	"crypto/md5"
	"encoding/base64"
	"encoding/hex"
	"fmt"
	"offgit/types"
	"os"
	"strings"
)

const TMP_PATH = "/tmp/clones/"

var imgExtensions []string = []string{"jpg", "jpeg", "png", "gif"}

func contains(s []string, str string) bool {
	for _, v := range s {
		if v == str {
			return true
		}
	}

	return false
}

func DirTree(path string) ([]*types.File, error) {

	var mainFiles []*types.File
	files, err := os.ReadDir(path)
	if err != nil {
		return []*types.File{}, err
	}
	for _, f := range files {
		filePath := fmt.Sprintf("%s/%s", path, f.Name())
		file := types.File{
			IsDir:     f.IsDir(),
			Name:      f.Name(),
			Path:      filePath[len(TMP_PATH):],
			Childrens: []*types.File{},
		}
		if !f.IsDir() {
			fileExts := strings.Split(f.Name(), ".")
			extension := fileExts[len(fileExts)-1]
			file.Extension = extension
			content, err := os.ReadFile(filePath)
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
			nested, err := DirTree(path + "/" + f.Name())
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
