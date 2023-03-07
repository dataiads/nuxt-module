## Local environment

Running the app in a local developer environment is simple.

Using `yarn install` or simply `yarn` should install the required dependencies.

Using `yarn dev` or `nuxt dev --port [your desired port]` will quickly up the app and, spare any errors, will allow you to get a product from the backend as well as use the filter system.

The backend platform is the one defined in the `nuxt.config.ts`, under `lpoDomain`.

This means that the development environment will not be available if the backend has not been deployed or does not have access to the product feed.

In order to view a product page, you simply need to navigate to 
`http://localhost:[your desired port]/[product url path]`.

Product URLs are foudn in the product GMC feed or in the Dataiads backoffice.
