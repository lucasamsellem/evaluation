jklqdsf
jjklmqdfj

# Authentification & Autorisation avec Express et MongoDB

> Vous avez la journée pour réaliser l’évaluation suivante.
> Votre projet devra être hébergé sur un dépôt Git et le lien devra être communiqué avant la fin de la journée.

#### L’objectif est de créer une application Node.js / Express avec MongoDB qui gère l’enregistrement, la connexion, l’autorisation et la sécurisation des routes, avec une gestion des rôles utilisateurs.

## Modèle User

> Créez un modèle User dans la base de données students avec la structure suivante :

```js
{
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin'] /* enum permet de spécifier des valeurs accéptées */ ,
        default: 'user'
      }
}
```

-   Le mot de passe devra être haché avec HMAC SHA-256 en utilisant un secret défini dans une variable d’environnement.
    [Pour le hachage : https://melvingeorge.me/blog/create-sha256-hash-nodejs](https://melvingeorge.me/blog/create-sha256-hash-nodejs)
-   L’email doit être unique.

## Page d’enregistrement

> Créez une page accessible à l’adresse /register contenant un formulaire d’inscription avec les champs :

-   Prénom
-   Nom
-   Email
-   Mot de passe
-   Confirmation du mot de passe

### Validation attendue :

1. Aucun champ ne doit être vide
2. Les deux mots de passe doivent correspondre
3. Le mot de passe doit comporter au moins 8 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial
4. L’utilisateur ne doit pas déjà exister en base (vérification par email)
5. En cas d’erreur, le formulaire doit être réaffiché avec les messages d’erreurs appropriés.

-   Le formulaire n'enregistre que des utilisateurs

### Admin

> Utilisez une seed pour insérer un admin en base de données

## Page de connexion

> Créez une page /login avec un formulaire demandant l’email et le mot de passe.

1. Si les informations sont correctes → rediriger vers le Dashboard

2. Si elles sont incorrectes → réafficher la page avec un message d’erreur

## Pages sécurisées (Dashboard)

> Une fois connecté, l’utilisateur doit être redirigé vers son Dashboard accessible uniquement aux utilisateurs authentifiés :

-   `/dashboard` → page accessible à tous les utilisateurs connectés

-   `/admin` → page réservée uniquement aux administrateurs

#### Un utilisateur ayant le rôle user ne doit pas pouvoir accéder à la page admin.

## Middlewares de sécurité

> Créez deux middlewares :

> authMiddleware
>
> > -   Vérifie qu’un utilisateur est connecté
> >
> > -   Sinon, redirige vers /login

> adminMiddleware
>
> > -   Vérifie que l’utilisateur connecté a le rôle admin
> >
> > -   Sinon, renvoie une erreur ou une redirection vers le dashboard

## Bonus (facultatif)

> Si vous avez terminé les étapes précédentes, vous pouvez ajouter :

-   Une expiration automatique de la session après 15 min d’inactivité

-   Des flash messages pour afficher les succès ou erreurs (par exemple : “Compte créé avec succès”, “Mot de passe incorrect”, etc.)

Structure minimale attendue

```text
project/
├──controllers
│   └── user.js
├── models/
│   └── User.js
├── routes/
│   ├── auth.js
│   ├── dashboard.js
│   └── admin.js
├── middlewares/
│   ├── auth.js
│   └── admin.js
├── views/
│   ├── register.pug
│   ├── login.pug
│   ├── dashboard.pug
│   └── admin.pug
├── .env
├── server.js
└── package.json
```

> (Vous pouvez adapter la structure selon vos préférences si elle reste claire et organisée.)

## Design

> Utilisez un framework CSS de votre choix (Bootstrap, Tailwind, etc.)
>
> L’interface doit être claire, sobre et agréable à utiliser

# Livraison

-   Hébergez votre code sur un dépôt Git

-   Envoyez le lien vers votre dépôt avant la fin de la journée
