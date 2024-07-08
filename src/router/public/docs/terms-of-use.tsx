import { Layout } from "@/components/layout";
import { useDocumentTitle } from "@uidotdev/usehooks";

export default function TermsOfUsePage() {
  useDocumentTitle("Terms of Use - Toono Community");

  return (
    <Layout>
      <main className='mx-auto mb-3 flex w-full max-w-4xl gap-3 px-3'>
        <article className='mx-auto max-w-3xl p-6'>
          <h1 className='mb-4 text-3xl font-bold'>Terms of Use</h1>
          <p className='mb-6'>June, 2024</p>

          <p className='mb-4'>
            Welcome to Toono Community! By accessing and using our website
            (https://toono-community.vercel.app), you agree to comply with and be bound by
            the following terms and conditions. Please review these Terms of Use carefully.
            If you do not agree to these terms, you should not use this site.
          </p>

          <h2 className='mb-4 text-2xl font-semibold'>1. Acceptance of Terms</h2>
          <p className='mb-4'>
            By using Toono Community, you agree to be bound by these Terms of Use and our
            Privacy Policy. If you do not agree to these terms, please do not use our
            website.
          </p>

          <h2 className='mb-4 text-2xl font-semibold'>2. Changes to Terms</h2>
          <p className='mb-4'>
            We reserve the right to modify these Terms of Use at any time. Any changes will
            be effective immediately upon posting on our website. Your continued use of the
            site after any modifications indicates your acceptance of the new Terms of Use.
          </p>

          <h2 className='mb-4 text-2xl font-semibold'>3. Use of the Site</h2>
          <p className='mb-4'>
            You agree to use the Toono Community website for lawful purposes only. You are
            prohibited from using the site to engage in any activity that could harm others
            or that is illegal.
          </p>

          <h2 className='mb-4 text-2xl font-semibold'>4. Intellectual Property</h2>
          <p className='mb-4'>
            All content on this site, including text, graphics, logos, and images, is the
            property of Toono Community or its content suppliers and is protected by
            copyright laws. You may not reproduce, distribute, or create derivative works
            from any of the content without prior written permission.
          </p>

          <h2 className='mb-4 text-2xl font-semibold'>5. User Conduct</h2>
          <p className='mb-4'>
            You agree not to use the site to upload, post, email, or otherwise transmit any
            content that is unlawful, harmful, or offensive. You also agree not to disrupt
            or interfere with the security or operation of the site.
          </p>

          <h2 className='mb-4 text-2xl font-semibold'>6. Termination</h2>
          <p className='mb-4'>
            We reserve the right to terminate or suspend your access to Toono Community at
            any time, without notice, for conduct that we believe violates these Terms of
            Use or is harmful to other users of the site, us, or third parties, or for any
            other reason.
          </p>

          <h2 className='mb-4 text-2xl font-semibold'>7. Disclaimer of Warranties</h2>
          <p className='mb-4'>
            The Toono Community website is provided "as is" and without warranties of any
            kind. We do not warrant that the site will be available at all times or that it
            will be free from errors or viruses.
          </p>

          <h2 className='mb-4 text-2xl font-semibold'>8. Limitation of Liability</h2>
          <p className='mb-4'>
            To the fullest extent permitted by law, Toono Community will not be liable for
            any indirect, incidental, or consequential damages arising from the use of our
            site.
          </p>

          <h2 className='mb-4 text-2xl font-semibold'>9. Governing Law</h2>
          <p className='mb-4'>
            These Terms of Use are governed by and construed in accordance with the laws of
            the jurisdiction in which Toono Community operates, without regard to its
            conflict of law principles.
          </p>

          <h2 className='mb-4 text-2xl font-semibold'>10. Contact Information</h2>
          <p className='mb-4'>
            If you have any questions about these Terms of Use, please contact us at:
          </p>
          <p className='mb-4'>
            Email:{" "}
            <a
              href='mailto:support@toono-community.com'
              className='text-blue-500 underline'>
              support@toono-community.com
            </a>
          </p>

          <p className='mb-4'>Thank you for using Toono Community!</p>
        </article>
      </main>
    </Layout>
  );
}
