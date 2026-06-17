import { cookies } from "next/headers";
import { getCustomerProfileById } from "./customer-data";
import {
  CUSTOMER_SESSION_COOKIE,
  getCustomerSessionSecret,
  verifyCustomerSessionValue,
} from "./customer-session";

export async function getCurrentCustomer() {
  const cookieStore = await cookies();
  const session = await verifyCustomerSessionValue(
    cookieStore.get(CUSTOMER_SESSION_COOKIE)?.value,
    getCustomerSessionSecret(),
  );

  if (!session) return null;
  return getCustomerProfileById(session.customerProfileId);
}
