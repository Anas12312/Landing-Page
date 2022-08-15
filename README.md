# Landing Page Project

## Table of Contents

* [Description](#Description)
* [Requirements](#Requirements)
* [Additional-features](#Additonal-features)
* [Methods](#Methods)


## Description:

Responsive Landing Page project.

## Requirements:

1. Navigation is built dynamically as an unordered list.
2. The section that is being viewed while scrolling through the page is highlighted.
3. When clicking an item from the navigation menu, the link scrolls to the appropriate section with smooth scrolling.
4. Responsive layout design that optimize content for different screen sizes

## Additional-features:

1. Active state to the navigation items when a section is in the viewport.
2. The fixed navigation bar is hidden if the user stopped scrolling for 2 seconds.
3. scroll to top button on the page that’s only visible when the user scrolls below the fold of the page.
4. sections are collapsible.

## Methods

1. Creating navigation bar content via `document.createElement('li')`, and `Element.appendChild()`.
2. Toggling the CSS class by using `Element.classList.add('class-name')`, and `Element.classList.remove('class-name)`.
3. Checked which section is scrolled to using `Element.getBoundingClientRect()`.
4. Scrolling through sections using the navigation bar via `Element.ScrollToView()`.
5. Responsive layout design is done using the `@media only screen and (max width: 35em)` queries.
6. Used `setTimeout` to check when the user is no longer scrolling.
7. Scroll to top button is done using `document.body.scroll()` and setting the `behavior: smooth`.
8. The collapsible sections is developed by `Element.style.display: none` or `Element.style.display: block`.