export enum AvailableProducts {
    credit = "credit",
    plan_basic = "plan_basic",
    plan_premium = "plan_premium",
    proration = "proration"
}

export const plansConfiguration = {
    availablePlans: AvailableProducts
} as const