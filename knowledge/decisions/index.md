# Decisions

<!-- GA-GENERATED:index -->

- [Every deploy carries AdSense](adsense-required-for-deploy.md) - A production deploy must have VITE_ADSENSE_CLIENT set; deploy.yml failing without it is intended. Leaving it empty is for local builds only.
- [Consent through Google, privacy policy at /privacy](consent-and-privacy-policy.md) - Ad consent is left to Google's own AdSense consent message; the privacy policy it points to lives at /privacy in English and Hindi and is not linked from the site.
- [Component styles are scoped](scoped-component-styles.md) - Single-file components use <style scoped> only; the existing global <style> blocks are debt to convert.

<!-- GA-GENERATED:END -->
