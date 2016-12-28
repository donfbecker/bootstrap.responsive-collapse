A jQuery plugin for partially collapsing Bootstrap navbars.

## Installation

Include script *after* the jQuery library (unless you are packaging scripts somehow else):

```html
<script src="/path/to/bootstrap.responsive-collapse.js"></script>
```

**Do not include the script directly from GitHub (http://raw.github.com/...).** The file is being served as text/plain and as such being blocked
in Internet Explorer on Windows 7 for instance (because of the wrong MIME type). Bottom line: GitHub is not a CDN.

## Usage

```javascript
$.responsiveCollapse('.navbar-nav');
```

## Customization

```javascript
$.responsiveCollapse('.navbar-nav', {
	// Bootstraps xs breakpoint
	breakPoint: 768,

	// Content for overflow menu item
	overflowItemText: '<i class="fa fa-bars"></i> More <b class="caret"></b>'
});
```

## Authors

[Donald Becker](https://github.com/psyon)
