## Roadmap

### MVP Final

#### Cell Editor

Add individual label editing.

* Edit label name OK
* Edit label price OK
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

* Reduce price column width. OK
* Increase price font size. OK
* Give more space to product name. OK

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

Remove dynamic Home heading. OK

Use:

* `NEXT_PUBLIC_STORE_NAME` environment variable. OK
* Next.js page metadata title. OK

### Custom Favicon

Add custom SVG favicon. OK 

Options:

* Woo Labels initials <--- selected
* Printer icon.

## Future Improvements

* Saved templates.
* Multiple WooCommerce stores.
* User accounts.
* Label history.
* Barcode support OK
* QR support