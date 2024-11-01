# Jekyll App

This project is built with [Jekyll](https://jekyllrb.com/), a static site generator perfect for blogs, documentation, and personal websites. This README provides useful commands for setting up, running, and managing your Jekyll site.

## Prerequisites

- **Ruby**: Ensure Ruby is installed on your system. [Install Ruby](https://www.ruby-lang.org/en/documentation/installation/)
- **Bundler**: Install Bundler to manage gems.

```bash
  gem install bundler
```

## Running the App

Install dependencies

```bash
bundle install
```

To start the Jekyll server:

```bash
bundle exec jekyll serve
```

## Useful Commands

Serve the site locally:

```bash
bundle exec jekyll serve
```

Build for production

```bash
bundle exec jekyll build
```

Clean the generated site

```bash
bundle exec jekyll clean
```

## Configuration

Update the \_config.yml file to configure the site settings, such as the title, description, URL, and more.

## Troubleshooting

Check Ruby and Bundler Versions:

```bash
ruby -v
bundler -v
```

Update dependencies:

```bash
bundle update
```

Rebuild the site: If changes aren't showing, try cleaning and serving the site again:

```bash
bundle exec jekyll clean
bundle exec jekyll serve
```
