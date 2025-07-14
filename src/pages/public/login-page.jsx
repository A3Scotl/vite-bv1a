"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { loginApi } from "@/apis/auth-api";
import { jwtDecode } from "jwt-decode";
import LoadingPage from "@/pages/common/loading-page";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  // ⚠️ Nếu đã đăng nhập, chuyển hướng về dashboard
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await loginApi({ email, password });

    if (response.success) {
      const token = response.token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      const userData = {
        email: decoded.sub,
        role: decoded.role,
        exp: decoded.exp,
      };

      login(userData);
      toast.success(response.message);
      navigate("/dashboard");
    } else {
      toast.error(response.message || "Đăng nhập thất bại");
    }

    setLoading(false);
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login to Dashboard</CardTitle>
          <CardDescription>
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="******"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
