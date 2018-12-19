export function isLocalDev() {
    return process.env.NODE_ENV !== "production";
}
