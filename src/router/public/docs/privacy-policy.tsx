import { Layout } from "@/components/layout";
import { useDocumentTitle } from "@uidotdev/usehooks";

export default function PrivacyPolicyPage() {
  useDocumentTitle("Privacy Policy - Toono Community");

  return (
    <Layout>
      <main className='relative mx-auto mb-3 flex w-full max-w-4xl gap-3 px-3'>
        <article className='min-h-screen px-4 py-10'>
          <div className='mx-auto max-w-3xl rounded-lg'>
            <h1 className='mb-4 text-3xl font-bold'>Privacy Policy</h1>
            <p className='mb-6'>Date: June, 2024</p>

            <p className='mb-4'>
              Welcome to Toono Community! Your privacy is important to us. This Privacy
              Policy explains how we collect, use, and protect your information when you
              visit our website <strong>(https://toono-community.vercel.app)</strong>. By
              using our website, you agree to the terms of this Privacy Policy.
            </p>

            <h2 className='mb-4 text-2xl font-semibold'>Information We Collect</h2>

            <h3 className='mb-2 text-xl font-semibold'>Cookies</h3>
            <p className='mb-4'>
              Toono Community uses cookies to enhance your user experience. Cookies are
              small text files stored on your device when you visit our website. These
              cookies help us:
            </p>
            <ul className='mb-4 list-inside list-disc'>
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our website</li>
              <li>Improve the overall user experience</li>
            </ul>

            <h2 className='mb-4 text-2xl font-semibold'>How We Use Your Information</h2>
            <p className='mb-4'>
              The information collected through cookies is used solely to improve your
              experience on our website. We do not use cookies for tracking or advertising
              purposes.
            </p>

            <h2 className='mb-4 text-2xl font-semibold'>Types of Cookies We Use</h2>
            <h3 className='mb-2 text-xl font-semibold'>Essential Cookies</h3>
            <p className='mb-4'>
              These cookies are necessary for the website to function correctly. They enable
              basic features like page navigation and access to secure areas of the website.
            </p>
            <h3 className='mb-2 text-xl font-semibold'>Preference Cookies</h3>
            <p className='mb-4'>
              These cookies allow our website to remember information that changes the way
              the site behaves or looks, such as your preferred language or the region you
              are in.
            </p>
            <h3 className='mb-2 text-xl font-semibold'>Analytics Cookies</h3>
            <p className='mb-4'>
              These cookies help us understand how visitors interact with our website by
              collecting and reporting information anonymously.
            </p>

            <h2 className='mb-4 text-2xl font-semibold'>Managing Cookies</h2>
            <p className='mb-4'>
              You can control and manage cookies in various ways. Please note that removing
              or blocking cookies may impact your user experience.
            </p>
            <ul className='mb-4 list-inside list-disc'>
              <li>
                <strong>Browser Settings:</strong> Most web browsers allow you to control
                cookies through their settings preferences. You can set your browser to
                block or alert you about these cookies, but some parts of the website may
                not function properly.
              </li>
              <li>
                <strong>Third-Party Tools:</strong> There are several third-party tools
                available that allow you to control cookies, such as browser plugins and
                add-ons.
              </li>
            </ul>

            <h2 className='mb-4 text-2xl font-semibold'>Data Security</h2>
            <p className='mb-4 '>
              We are committed to ensuring that your information is secure. We have
              implemented appropriate technical and organizational measures to safeguard
              your data against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className='mb-4 text-2xl font-semibold'>Changes to This Privacy Policy</h2>
            <p className='mb-4'>
              Toono Community may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on this page. You
              are advised to review this Privacy Policy periodically for any changes.
              Changes to this Privacy Policy are effective when they are posted on this
              page.
            </p>

            <h2 className='mb-4 text-2xl font-semibold'>Contact Us</h2>
            <p className='mb-4'>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className='mb-4'>
              Email:{" "}
              <a
                href='mailto:support@toono-community.com'
                className='text-blue-500 underline'>
                support@toono-community.com
              </a>
            </p>

            <p className='mb-4'>Thank you for being a part of the Toono Community!</p>
          </div>
        </article>
      </main>
    </Layout>
  );
}
