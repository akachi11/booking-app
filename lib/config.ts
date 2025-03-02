const config = {
    env: {
        apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
        prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
        databaseUrl: process.env.DATABASE_URL!,
        upstash: {
            qstashUrl: process.env.QSTASH_URL!,
            qstashToken: process.env.QSTASH_TOKEN!
        },
        emailTemplates: {
            confirmation: process.env.NEXT_PUBLIC_CONFIRMATION_EMAIL_TEMPLATE_ID!,
            cancelled: process.env.NEXT_PUBLIC_CANCELLATION_EMAIL_TEMPLATE_ID!
        }
    }
}

export default config