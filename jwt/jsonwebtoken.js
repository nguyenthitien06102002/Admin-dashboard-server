
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
	const authHeader = req.header('Authorization'); 

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Access denied. Token missing or invalid' });
	}

	const token = authHeader.split(' ')[1]; 

	try {
		const decoded = jwt.verify(token, 'yourSecretKey'); 
		req.user = decoded; 
		next(); 
		console.log(decoded);
	} catch (error) {
		return res.status(403).json({ message: 'Access denied. Invalid or expired token' });
	}
};


export const authorizeRole = (requiredRole) => {
	return (req, res, next) => {
		console.log(req.user.role);
		if (!req.user || req.user.role !== requiredRole) {
			return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
		}
		next();
	};
};

