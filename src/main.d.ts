declare var connexionAutomatique: boolean
declare var Identifiant: string
declare var MotDePasse: string
declare var raccourcis: boolean

declare var GInterface: {
    moteurConnexion: {
        setLogin: (identifiant: string) => void
        setMotDePasse: (motDePasse: string) => void
        identification: () => void
    }
}