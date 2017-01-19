# mobile-chrome-vh-fix

Mobile (Android and iOS) Chrome has something I consider a bug.
On scroll, when address bar dissapears, inner window height is changed,
and with it <code>vh</code> units size is changed as well,
making whole page to jump after recalculating the layout.
This also happens when keyboard pops up.

This small library aims to solve that problem.

[Demo and docs](https://stanko.github.io/mobile-chrome-vh-fix/)
