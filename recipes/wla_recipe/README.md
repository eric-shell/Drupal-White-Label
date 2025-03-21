# White Label Application Recipe

This Drupal 10 recipe provides a comprehensive setup for a White Label Application with common configurations and features.

## Features

- Pre-configured content types (Basic and Landing)
- Paragraph types for flexible content layouts
- User roles and permissions
- SEO optimization tools
- Performance optimization settings
- Security configurations
- Media handling capabilities
- SVG support
- WebP image format support

## Requirements

- Drupal 10.x
- PHP 8.2 or higher
- Composer

## Installation

1. Create a new Drupal 10 project:
   ```bash
   composer create-project drupal/recommended-project my-project
   ```

2. Add this recipe to your project:
   ```bash
   composer require drupal/wla_recipe
   ```

3. Install the recipe using Drush:
   ```bash
   drush recipe:install wla_recipe
   ```

## Configuration

After installation, you should:

1. Configure your site name and other basic settings at `/admin/config/system/site-information`
2. Set up your theme at `/admin/appearance`
3. Configure Google Tag Manager if needed at `/admin/config/system/google-tag`
4. Set up your robots.txt at `/admin/config/search/robotstxt`
5. Configure your sitemap at `/admin/config/search/simplesitemap`

## Customization

The recipe provides a base configuration that you can customize according to your needs:

- Modify content types at `/admin/structure/types`
- Adjust paragraph types at `/admin/structure/paragraphs_type`
- Update user roles and permissions at `/admin/people/roles`
- Configure SEO settings at `/admin/config/search/metatag`

## Support

For issues and feature requests, please create an issue in the recipe's issue queue.
