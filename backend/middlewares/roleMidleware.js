

/**
 * Middleware function to authorize user roles.
 * 
 * This middleware checks if the user has the required roles to access a specific route.
 * It should be used in routes where role-based access control is necessary.
 * 
 * 
 */

const authorizeRoles = (...allowedRoles) => {
   return (req, res, next) => {
      if (!allowedRoles.includes(req.userRole)) {
         return res.status(403).json({ message: "You do not have permission to perform this route", success: false })
      }

      next()
   }
}


export default authorizeRoles