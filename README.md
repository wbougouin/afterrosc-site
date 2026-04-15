# AfterROSC — Site web

Site du réseau de recherche AfterROSC, construit avec Hugo et Decap CMS.

## Déploiement sur Netlify (guide pas à pas)

### Étape 1 : Créer un compte GitHub
1. Allez sur **https://github.com** et cliquez "Sign up"
2. Créez votre compte (email, mot de passe, pseudonyme)
3. Confirmez votre email

### Étape 2 : Créer un dépôt (repository)
1. Connecté sur GitHub, cliquez le **+** en haut à droite → "New repository"
2. Nom du repository : `afterrosc-site`
3. Cochez "Public"
4. Cliquez "Create repository"
5. Cliquez "uploading an existing file" et déposez TOUS les fichiers de ce dossier
6. Cliquez "Commit changes"

### Étape 3 : Connecter Netlify
1. Allez sur **https://app.netlify.com** et connectez-vous avec votre compte GitHub
2. Cliquez "Add new site" → "Import an existing project"
3. Choisissez "GitHub" puis sélectionnez le repo `afterrosc-site`
4. Netlify détecte automatiquement Hugo. Vérifiez :
   - Build command : `hugo --minify`
   - Publish directory : `public`
5. Cliquez "Deploy site"
6. Attendez 1-2 minutes : votre site est en ligne !

### Étape 4 : Activer le CMS (admin)
1. Dans Netlify, allez dans "Integrations" → "Identity" → "Enable"
2. Allez dans "Settings" → "Identity" → "Registration" → choisissez "Invite only"
3. Allez dans "Identity" → "Invite users" → entrez votre email
4. Allez dans "Settings" → "Identity" → "Services" → "Enable Git Gateway"
5. Vérifiez votre email et créez votre mot de passe
6. Allez sur `votre-site.netlify.app/admin/` → connectez-vous → vous pouvez modifier le contenu !

### Étape 5 : Connecter le domaine afterrosc.org
1. Dans Netlify : "Domain management" → "Add custom domain"
2. Entrez `afterrosc.org`
3. Netlify vous donnera des serveurs DNS à configurer
4. Allez chez votre registraire de domaine (OVH, Gandi, etc.)
5. Modifiez les DNS pour pointer vers ceux de Netlify
6. Attendez 24h pour la propagation DNS

## Structure du site
- `content/` : pages en Markdown (modifiables via le CMS)
- `static/` : images, CSS, JS
- `layouts/` : templates HTML
- `data/` : données structurées (membres du bureau)
