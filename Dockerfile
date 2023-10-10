# Utilisez une image de base, par exemple Ubuntu
FROM ubuntu:20.04

# Mettez à jour les paquets et installez les dépendances
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Installez des outils ou effectuez d'autres opérations nécessaires
# Par exemple, installez Node.js
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Copiez votre application dans le conteneur
WORKDIR /app
COPY . .

# Exécutez votre application ou serveur, par exemple, un serveur web Node.js
CMD ["node", "app.js"]
