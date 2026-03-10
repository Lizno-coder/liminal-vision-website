import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  
  if (!code) {
    // Initial authorization request
    const clientId = process.env.OAUTH_CLIENT_ID;
    const redirectUri = `${request.nextUrl.origin}/api/auth`;
    
    if (!clientId) {
      return NextResponse.json(
        { error: "OAuth not configured. Please set OAUTH_CLIENT_ID environment variable." },
        { status: 500 }
      );
    }
    
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo`;
    
    return NextResponse.redirect(githubAuthUrl);
  }
  
  // Handle callback from GitHub
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "OAuth not fully configured" },
      { status: 500 }
    );
  }
  
  try {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      return NextResponse.json(
        { error: tokenData.error_description || tokenData.error },
        { status: 400 }
      );
    }
    
    // Redirect back to admin with token
    const redirectUrl = new URL("/admin", request.nextUrl.origin);
    redirectUrl.searchParams.set("token", tokenData.access_token);
    
    return NextResponse.redirect(redirectUrl);
    
  } catch (error) {
    console.error("OAuth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
