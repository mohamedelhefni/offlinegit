export function isGitUrl(url: string): Boolean {
    var regex = /(?:https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/;
    return regex.test(url);
}