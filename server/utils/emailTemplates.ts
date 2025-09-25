export interface ContactEmailData {
  name: string
  email: string
  message: string
}

/**
 * Renders a professional HTML email template for contact form submissions
 * Includes responsive design and dark mode considerations
 */
export function renderContactEmailTemplate(data: ContactEmailData): string {
  // Escape HTML to prevent XSS
  const escapeHtml = (unsafe: string): string => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
  }

  const { name, email, message } = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    message: escapeHtml(data.message).replace(/\n/g, '<br>')
  }

  return `
    <!DOCTYPE html>
    <html lang="de">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Neue Kontaktanfrage</title>
        <style>
          /* Reset and base styles */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background-color: #f9fafb;
            padding: 20px;
          }
          
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
          
          .email-header {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: #ffffff;
            padding: 32px 24px;
            text-align: center;
          }
          
          .email-header h1 {
            font-size: 24px;
            font-weight: 600;
            margin: 0 0 8px 0;
          }
          
          .email-header p {
            font-size: 16px;
            opacity: 0.9;
            margin: 0;
          }
          
          .email-content {
            padding: 32px 24px;
          }
          
          .field-group {
            margin-bottom: 24px;
          }
          
          .field-label {
            font-weight: 600;
            color: #374151;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
            display: block;
          }
          
          .field-value {
            font-size: 16px;
            color: #1f2937;
          }
          
          .field-value.email {
            color: #3b82f6;
            text-decoration: none;
          }
          
          .field-value.email:hover {
            text-decoration: underline;
          }
          
          .message-container {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-left: 4px solid #3b82f6;
            border-radius: 0 6px 6px 0;
            padding: 20px;
            margin-top: 8px;
          }
          
          .message-text {
            font-size: 16px;
            line-height: 1.7;
            color: #374151;
            word-wrap: break-word;
          }
          
          .email-footer {
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            padding: 24px;
            text-align: center;
          }
          
          .footer-text {
            font-size: 14px;
            color: #6b7280;
            margin: 0;
          }
          
          .website-link {
            color: #3b82f6;
            text-decoration: none;
            font-weight: 500;
          }
          
          .website-link:hover {
            text-decoration: underline;
          }
          
          /* Responsive design */
          @media only screen and (max-width: 600px) {
            body {
              padding: 10px;
            }
            
            .email-header {
              padding: 24px 16px;
            }
            
            .email-content {
              padding: 24px 16px;
            }
            
            .email-footer {
              padding: 20px 16px;
            }
            
            .email-header h1 {
              font-size: 20px;
            }
            
            .message-container {
              padding: 16px;
            }
          }
          
          /* Dark mode support for email clients that support it */
          @media (prefers-color-scheme: dark) {
            .email-container {
              background: #1f2937;
              color: #f9fafb;
            }
            
            .email-content {
              color: #f9fafb;
            }
            
            .field-value {
              color: #f9fafb;
            }
            
            .message-container {
              background: #374151;
              border-color: #4b5563;
              border-left-color: #60a5fa;
            }
            
            .message-text {
              color: #e5e7eb;
            }
            
            .email-footer {
              background: #374151;
              border-color: #4b5563;
            }
            
            .footer-text {
              color: #9ca3af;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>Neue Kontaktanfrage</h1>
            <p>Portfolio Website - chad.lu</p>
          </div>
          
          <div class="email-content">
            <div class="field-group">
              <span class="field-label">Name</span>
              <div class="field-value">${name}</div>
            </div>
            
            <div class="field-group">
              <span class="field-label">E-Mail Adresse</span>
              <div class="field-value">
                <a href="mailto:${email}" class="field-value email">${email}</a>
              </div>
            </div>
            
            <div class="field-group">
              <span class="field-label">Nachricht</span>
              <div class="message-container">
                <div class="message-text">${message}</div>
              </div>
            </div>
          </div>
          
          <div class="email-footer">
            <p class="footer-text">
              Diese E-Mail wurde über das Kontaktformular von 
              <a href="https://www.chad.lu" class="website-link">chad.lu</a> gesendet.
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

/**
 * Renders a simple text version of the contact email for fallback
 */
export function renderContactEmailText(data: ContactEmailData): string {
  return `
Neue Kontaktanfrage - Portfolio Website

Name: ${data.name}
E-Mail: ${data.email}

Nachricht:
${data.message}

---
Diese E-Mail wurde über das Kontaktformular von chad.lu gesendet.
  `.trim()
}