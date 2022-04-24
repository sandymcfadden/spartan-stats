declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly SEND_EMAIL: string;
      readonly ADMIN_EMAIL: string;
      readonly SENDER_EMAIL: string;
      readonly WELCOME_EMAIL_TEMPLATE_ID: string;
      readonly NEW_USER_NOTIFICATION_TEMPLATE_ID: string;
      readonly ACCOUNT_APPROVED_TEMPLATE_ID: string;
      readonly SENDGRID_API_KEY: string;
    }
  }
}

export {};
