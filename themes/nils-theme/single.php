<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

 if( class_exists('Dynamic_Featured_Image') ) {
      global $dynamic_featured_image;
      $featured_images = $dynamic_featured_image->get_featured_images( $post->ID );
  }

	$args = array(
		'category_name' => array('branding')
	);

$context = Timber::get_context();
$post = Timber::query_post();
$context['post'] = $post;
$context['comment_form'] = TimberHelper::get_comment_form();
$context['sidebar_2'] = Timber::get_widgets('sidebar-2');
$context['video'] = get_the_post_video( $post->ID );
$context['images'] = $featured_images;
$context['related'] = Timber::get_posts( array( 'category__in' => wp_get_post_categories($post->ID), 'numberposts' => 5, 'post__not_in' => array($post->ID) ) );

// $context['related'] = Timber::get_posts($args);

// $context['related'] = Timber::get_terms('category', array('parent' => 0));


if ( post_password_required( $post->ID ) ) {
	Timber::render( 'single-password.twig', $context );
} else {
	Timber::render( array( 'single-' . $post->ID . '.twig', 'single-' . $post->post_type . '.twig', 'single.twig' ), $context );
}
