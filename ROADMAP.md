## Roadmap

### MVP Final

#### Cell Editor

Add individual label editing.

* Edit label name.
* Edit label price.
* Preserve WooCommerce product data.
* Allow custom values per cell.

### Label Typography Controls

Separate typography controls for:

* Product name size.
* Product price size.

### Cell Spacing Controls

Add configurable cell padding presets:

* Compact.
* Normal.
* Large.

### Price Layout Improvements

Improve horizontal label layout:

* Reduce price column width.
* Increase price font size.
* Give more space to product name.

## Editor UX Improvements

### Toolbar Layout

Improve toolbar distribution.

Goals:

* Better visual balance.
* Keep product assignment accessible.
* Organize configuration controls.

### Icon Based Controls

Replace text controls with icons.

Requirements:

* Use SVG icons.
* Keep tooltips for accessibility.

## Visual Customization

### Font Selector

Add predefined font options.

Supported configuration:

* Font family.
* Product name font.
* Product price font.

### Theme Support

Add light/dark theme switching.

Requirements:

* Editor supports both themes.
* Printing remains optimized for white backgrounds.

## Branding

### Dynamic Page Title

Remove dynamic Home heading.

Use:

* `APP_TITLE` environment variable.
* Next.js page metadata title.

### Custom Favicon

Add custom SVG favicon.

Options:

* Woo Labels initials.
* Printer icon.

## Future Improvements

* Saved templates.
* Multiple WooCommerce stores.
* User accounts.
* Label history.
* QR and barcode support.
