# React Native Movies App

A mobile application built with React Native that allows users to browse movies, view details, and explore various genres. This app fetches movie data from an external API, allowing users to search for their favorite movies, view trailers, and save movies to a watchlist.

## Table of Contents

- [Features](#features)
- [Screens](#screens)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Dependencies](#dependencies)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## Features

- Browse popular, top-rated, and upcoming movies
- Search for movies by title
- View detailed movie information including synopsis, release date, and ratings
- Watch trailers for movies
- Save movies to a personalized watchlist
- Dark and light theme modes
- Responsive and smooth UI for mobile devices

## Screens

1. **Home Screen**: Displaying popular and top-rated movies.
2. **Movie Details Screen**: Showcasing the movie's synopsis, ratings, trailers, and more.
3. **Search Screen**: Enabling users to search movies by title.
4. **Watchlist Screen**: Displaying movies saved by the user.
5. **Genres Screen**: Filter movies by genres.
6. **Settings Screen**: Theme switching, account settings, and app preferences.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- React Native CLI or Expo CLI (depending on the app setup)
- Android Studio/Xcode for mobile emulation

### Steps to Install

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/movies-app.git
   cd movies-app
   ```

2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the environment for API keys:
   - Create a `.env` file in the root directory
   - Add your movie API key:
     ```
     MOVIE_API_KEY=your_api_key_here
     ```

## Running the App

### For iOS
```bash
npx react-native run-ios
```

### For Android
```bash
npx react-native run-android
```

### Using Expo
```bash
expo start
```

## Dependencies

This app uses the following core libraries:

- [React Native](https://reactnative.dev/) for building the app
- [React Navigation](https://reactnavigation.org/) for navigating between screens
- [Axios](https://github.com/axios/axios) for API requests
- [React Query](https://react-query.tanstack.com/) for data fetching and caching
- [Day.js](https://day.js.org/) for date formatting
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) for storing watchlists

### Additional Packages

- `react-native-video` for playing movie trailers
- `react-native-vector-icons` for icons
- `styled-components` for styling components

## API Integration

The app integrates with the [TMDb (The Movie Database) API](https://www.themoviedb.org/documentation/api).

To set up the API:
1. Register on TMDb and get your API key.
2. Add your API key to the `.env` file as shown in the installation steps.
3. All API calls are managed in the `/src/api/` directory.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch with your feature: `git checkout -b my-feature`.
3. Commit your changes: `git commit -m 'Add my feature'`.
4. Push to the branch: `git push origin my-feature`.
5. Open a pull request.

## Screenshots

<table>
  <tr>
    <td>MoviesList</td>
     <td>Favorites</td>
     <td>MovieDetail-1</td>
  </tr>
  <tr>
        <td><img src="https://user-images.githubusercontent.com/48868012/225009396-10615429-8e88-491a-b98e-0e35947db821.png" width=270 height=550></td>
     <td><img src="https://user-images.githubusercontent.com/48868012/225009387-e4fc2699-cec2-47ce-b1bc-597cc50f8296.png" width=270 height=550></td>
        <td><img src="https://user-images.githubusercontent.com/48868012/225009332-2ad7aa75-6153-44f2-a034-0418b192636f.png" width=270 height=550></td>
  
  </tr>
   <tr>
    <td>MovieDetail-2</td>
     <td>Settings</td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/48868012/225009362-a4be52ce-4b81-4fec-8033-3f0a276e8e68.png" width=270 height=550></td>
    <td><img src="https://user-images.githubusercontent.com/48868012/225009376-dfb7a766-f8c2-4ec7-918b-b3b47bcb3a58.png" width=270 height=550></td>
  </tr>
 </table>

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

Feel free to modify and expand upon this template to suit your needs.