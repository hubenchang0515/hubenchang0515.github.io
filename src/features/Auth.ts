export function Login(clientId:string) {
    window.open(`https://github.com/login/oauth/authorize?client_id=${clientId}`)
}