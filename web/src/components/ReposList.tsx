let repos = [
    {
        name: "Test Repo",
        url: "https://github.com/mohamedelhefni/offlinegit.git",
        date: Date.now()
    },
    {
        name: "Test Repo 2",
        url: "https://github.com/mohamedelhefni/offlinegit.git",
        date: Date.now()
    },

]

function RepoItem({ repo }: any) {
    return (
        <div className="w-full p-2 border border-gray-200 transition hover:bg-gray-300 hover:text-zinc-800  mx-auto rounded">
            {repo.name}
        </div>
    )
}



export default function ReposList() {
    return (
        <div className="flex flex-col gap-3">
            {repos.map(repo => (
                <RepoItem repo={repo} />
            ))}
        </div>
    )
}