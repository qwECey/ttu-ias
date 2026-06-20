export function getRedirectPath(role: string) {
  switch (role) {
    case "ADMIN":
      return "/admin";

    case "STUDENT":
      return "/student";

    case "COMPANY":
      return "/company";

    case "SUPERVISOR":
      return "/supervisor";

    case "LIAISON":
      return "/liaison";

    default:
      return "/dashboard";
  }
}