# Teispace Homebrew tap

Homebrew packages for [Teispace](https://teispace.com/) apps.

## Teitunnel

[Teitunnel](https://teitunnel.teispace.com/) is the Cloudflare Tunnel app for macOS, Windows
and Linux.

```sh
brew install --cask teispace/tap/teitunnel     # the Mac app (includes teitunnel-cli)
brew install teispace/tap/teitunnel-cli        # only the command line: macOS and Linux
```

Install one or the other: the app already puts `teitunnel-cli` on your PATH. The app keeps
itself up to date; `brew upgrade` works too. `teitunnel-cli` installs `cloudflared` from
Homebrew as a dependency.

To remove the app and its settings, history and logs:

```sh
brew uninstall --zap --cask teispace/tap/teitunnel
```

Your Cloudflare account isn't changed: see [Uninstall](https://teitunnel.teispace.com/docs/getting-started/install/#uninstall).

## How it's kept current

Each app has a workflow that follows its releases and a script that renders its files.
For Teitunnel, [`teitunnel.yml`](.github/workflows/teitunnel.yml) checks for a new release
every three hours. It takes each file's checksum from the release's `SHA256SUMS.txt` after verifying that file's
[build provenance](https://github.com/teispace/teitunnel/attestations), renders the cask and
formula (`scripts/teitunnel.mjs`), installs and tests them on macOS and Linux, and only then
pushes. Don't edit `Casks/` or `Formula/` by hand; change the app's script.

Problems with Teitunnel itself: [teispace/teitunnel issues](https://github.com/teispace/teitunnel/issues).
