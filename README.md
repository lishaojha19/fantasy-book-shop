# fantasy-book-shop


A responsive online bookstore website for fantasy book lovers, built with plain **HTML, CSS and JavaScript**. No frameworks or build tools are needed.

## Features

- Book catalog of 12 fantasy titles with cover images
- Filter books by genre (Epic Fantasy, Dark Fantasy, Fae & Courts, Adventure)
- Live search by book title or author
- Shopping cart drawer with add, remove and quantity controls
- Automatic subtotal calculation
- Cart saved in the browser (localStorage), so it persists after a refresh
- Dark purple and gold fantasy theme
- Responsive layout for desktop, tablet and mobile

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, CSS variables)
- JavaScript (ES6)

## Project Structure

```
fantasy-book-shop/
├── index.html      # Page structure
├── styles.css      # Styling and theme
├── script.js       # Book data, search, filters and cart logic
└── images/         # Book cover images (1.svg to 12.svg)
```

## How to Run

1. Download or clone this repository.
2. Open `index.html` in any web browser.

## Customizing

- **Add or edit books:** change the `BOOKS` list at the top of `script.js`.
- **Use your own cover images:** put them in the `images` folder and update each book's `image` path.
- **Change colors:** edit the CSS variables at the top of `styles.css`.

## Note

This is a demo project. Checkout does not process real payments.
