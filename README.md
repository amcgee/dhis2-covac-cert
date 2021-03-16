# dhis2-covac-cert

> **WARNING**: DO NOT USE THIS IN PRODUCTION YET!

This is a proof-of-concept COVID vacinnation certificate integration module - it listens for HTTP requests, generates a DIVOC vaccination certificate, downloads the certificate PDF and posts it back to the DHIS2 system as a certification program stage event.

TODO:
- [ ] Remove dummy data from certificate request - populate with vaccination data from active program
- [ ] Support bulk generation for all uncertified vaccination events on a recurring schedule
- [ ] Accept HTTP or SMTP triggers from DHIS2 program notification
- [ ] Implement Tracker Capture widget to trigger certificate generation
- [ ] Support connection to additional certificate generation services
