# Sporky

## What is it?

Sporky is a web application that allows users to view their top tracks from Spotify.

## Tech stack

- [Nuxt.js](https://nuxt.com/): A Vue.js meta-framework for building web applications.
- [Vue.js](https://vuejs.org/): A progressive JavaScript framework for building user interfaces.
- [Pinia](https://pinia.vuejs.org/): A Vue.js state management library.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework.

## Getting started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

```bash
# Clone the repository:
git clone https://github.com/simone98dm/sporky

# Install the dependencies:
yarn install

# Generate the certificates:
yarn generate-cert

# Run the development server:
yarn dev
```

> The `dev` script defined in the [package.json](package.json) file, includes the following environment variable: `NODE_TLS_REJECT_UNAUTHORIZED=0`. It also specifies the `--https`, `--ssl-cert`, and `--ssl-key` flags to enable HTTPS and use the generated certificates.

### Environment

Update `.env` file with your spotify developer app keys, follow this [guide](https://developer.spotify.com/documentation/web-api/tutorials/getting-started#request-an-access-token)

```
NUXT_CLIENT_ID=your_client_id
NUXT_CLIENT_SECRET=your_client_secret
NUXT_BASE_URL=localhost:3000
```

## Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request
