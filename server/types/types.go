package types

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
