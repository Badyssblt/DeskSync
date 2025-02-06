# Utilisation de Node.js 22 comme base
FROM node:22

# Définition du dossier de travail
WORKDIR /app

# Copie des fichiers package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installation des dépendances
RUN npm install

# Copie des fichiers du projet
COPY . .

# Exposition du port utilisé par AdonisJS
EXPOSE 3333

# Démarrage du serveur AdonisJS en mode développement avec hot-reload
CMD ["npm", "run", "dev"]
