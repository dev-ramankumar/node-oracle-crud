export default function auth(req, res, next) {
  if (req.session && req.session.user && req.session.user.id) {
    // attach user info to req if needed
    req.user = req.session.user;
    return next();
  }
  // redirect to login for UI routes, JSON for API routes
  if (req.accepts("html")) {
    return res.redirect("/auth/login");
  }
  return res.status(401).json({ success: false, message: "Unauthorized" });
}
