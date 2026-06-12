"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

// FLOW
// localhost:3000 -> check token -> no token ? -> login
// 								 -> has token ? -> /auth/me -> get role -> redirect

export default function Home() {

	const router = useRouter();
	useEffect(() => {
		const checkUser = async () => {
			try {
				const token = localStorage.getItem("accessToken");

				if (!token) {
					router.push("/login");
					return;
				}
				const userData = await api("/auth/me");
				console.log(userData);

				const roles = userData.rolesArray;

				const rolesRoutes: Record<string, string> = { // avoid using if else for each roles
					ADMIN: "/admin",
					TEACHER: "/teacher",
					STUDENT: "/student",
					PRINCIPAL: "/principal",
					PARENT: "/parent"
				}
				if (!roles || roles.length === 0) {
					router.push("/unauthorized");
					return;
				}

				const firstRole = roles[0];
				// console.log("FIRST ROLE:", firstRole);

				if (rolesRoutes[firstRole]) {
					router.push(rolesRoutes[firstRole]);
					return;
				}
				router.push("/unauthorized")
			} catch (e) {
				console.log("error:", e)
				console.log("user data failed");
				// localStorage.removeItem("accessToken");
				router.push('/login');
			}
		}
		checkUser();
	}, []);

	return (
		<div className="bg-amber-200">
			home page
		</div>
	);
}
