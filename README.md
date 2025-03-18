## First Coffee

### DO THE FOLLOWING BEFORE DEVELOPMENT:

1- Before running the container, in your linux/macOS terminal (within the ~/firstcoffee on your branch), run these commands:

    1a- export SHOPIFY_STOREFRONT_ACCESS_TOKEN=TheStorefrontAccessTokenHere (No quotes)
    1b- export SHOPIFY_STORE_DOMAIN=TheURLOfShopHere (Looks like abcdef-aa.myshopify.com, located within the Shopify Admin account > Settings)

##### If you don't do this, your local Shell terminal will not have access to the envs, and will return blank envs in the Docker container.

1- Those commands in 1a & 1b are ONLY STORED IN THE CURRENT SESSION. to permanently store them in your shell run:

    (FYI using Bash zsh)

    1a- nano ~/.zshrc
    1b- at the end of the file insert the following:
        - export SHOPIFY_STOREFRONT_ACCESS_TOKEN=TheStorefrontAccessTokenHere (No quotes)
        - export SHOPIFY_STORE_DOMAIN=TheURLOfShopHere (Looks like abcdef-aa.myshopify.com, located within the Shopify Admin account > Settings)
    1c- Ctrl + x to exit
    1d- y to save
    1e- Enter to confirm filename
    1f- restart your terminal
    1g- to confirm they are set, run:
        echo $SHOPIFY_STOREFRONT_ACCESS_TOKEN
        echo $SHOPIFY_STORE_DOMAIN

### Update 14/03/2025
in terminal run: docker-compose --env-file .env.local up
### Update 18/03/2025
Railway builds off the Dockerfile.railway, GitHub Actions & Docker Image build off Dockerfile (hence the use of Build Secrets)