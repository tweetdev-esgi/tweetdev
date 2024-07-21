FROM node:14-alpine

# Install Python
RUN apk update && apk add --no-cache python3 py3-pip

# Create a directory for scripts
WORKDIR /scripts

# Entry point script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
