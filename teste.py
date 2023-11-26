import cryptography as crypto
import os

def create_signed_cert(cn):
    ca_cert = crypto.load_certificate(crypto.FILETYPE_PEM, open(os.path.join(settings.MEDIA_ROOT, CA_CERT_FILE)).read())

    ca_key = crypto.load_privatekey(crypto.FILETYPE_PEM, open(os.path.join(settings.MEDIA_ROOT, CA_KEY_FILE)).read())

    k = crypto.PKey()
    k.generate_key(crypto.TYPE_RSA, 2048)

    cert_req = crypto.X509Req()

    cert_req.get_subject().C = models.RootCrt.objects.first().country
    cert_req.get_subject().ST = models.RootCrt.objects.first().state
    cert_req.get_subject().L = models.RootCrt.objects.first().location
    cert_req.get_subject().O = models.RootCrt.objects.first().organization
    if models.RootCrt.objects.first().organizational_unit_name:
        cert_req.get_subject().OU = models.RootCrt.objects.first().organizational_unit_name
    cert_req.get_subject().CN = cn
    if models.RootCrt.objects.first().email:
        cert_req.get_subject().emailAddress = models.RootCrt.objects.first().email

    cert_req.set_pubkey(k)
    cert_req.sign(ca_key, 'sha256')

    cert = crypto.X509()
    cert.gmtime_adj_notBefore(0)
    cert.gmtime_adj_notAfter(5 * 365 * 24 * 60 * 60)
    cert.set_issuer(ca_cert.get_subject())
    cert.set_subject(cert_req.get_subject())
    cert.set_pubkey(cert_req.get_pubkey())
    cert.sign(ca_key, 'sha256') 



    //! PUT THE PROJECT AT AWS AND PUT IT DO RECEIVE REQUESTS BY HTTPS