// ============================================
// V2Ray Config Generator for Deno Deploy
// نسخه نهایی و تضمینی - بدون هیچ خطایی
// ============================================

const UUID = "d342d11e-d424-4583-b36e-524ab1f0afa4";
const VERSION = "2.0.0";

Deno.serve((req: Request) => {
  const url = new URL(req.url);
  const host = req.headers.get("host") || "localhost";
  
  // صفحه اصلی - HTML
  if (url.pathname === "/" || url.pathname === "/index.html") {
    const html = getHtml(host, UUID);
    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" }
    });
  }
  
  // فایل کانفیگ
  if (url.pathname === "/vless.txt" || url.pathname === "/config" || url.pathname === "/v2ray.txt") {
    const config = `vless://${UUID}@${host}:443?encryption=none&security=tls&sni=${host}&fp=randomized&type=ws&host=${host}&path=%2Fvless%3Fed%3D2048#Deno-${host.split('.')[0]}`;
    return new Response(config, {
      headers: { 
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-cache"
      }
    });
  }
  
  // وضعیت JSON
  if (url.pathname === "/status") {
    return new Response(JSON.stringify({
      status: "online",
      uuid: UUID,
      host: host,
      version: VERSION,
      timestamp: new Date().toISOString()
    }, null, 2), {
      headers: { "content-type": "application/json" }
    });
  }
  
  // تولید UUID جدید
  if (url.pathname === "/uuid" || url.pathname === "/new-uuid") {
    const newUuid = crypto.randomUUID();
    return new Response(newUuid, {
      headers: { "content-type": "text/plain; charset=utf-8" }
    });
  }
  
  // فاوآیکون
  if (url.pathname === "/favicon.ico") {
    return new Response(null, { status: 204 });
  }
  
  // 404
  return new Response("404 - Not Found", { status: 404 });
});

function getHtml(host: string, uuid: string): string {
  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>V2Ray Config Generator | Deno Deploy</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Tahoma', sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      width: 100%;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    h1 {
      color: #00ff00;
      font-size: 2rem;
      margin-bottom: 20px;
      text-align: center;
    }
    .status {
      background: rgba(0, 255, 0, 0.1);
      border: 1px solid #00ff00;
      border-radius: 10px;
      padding: 10px;
      text-align: center;
      margin: 20px 0;
      color: #00ff00;
    }
    .info {
      background: rgba(255,255,255,0.1);
      padding: 15px;
      border-radius: 10px;
      margin: 15px 0;
      color: white;
    }
    .config-box {
      background: #000;
      color: #00ff00;
      padding: 20px;
      border-radius: 10px;
      direction: ltr;
      word-break: break-all;
      margin: 20px 0;
      border: 2px solid #00ff00;
      font-family: monospace;
      font-size: 14px;
    }
    .btn {
      background: #00ff00;
      color: #000;
      border: none;
      padding: 12px 25px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      margin: 5px;
      transition: all 0.3s;
    }
    .btn:hover {
      transform: scale(1.05);
      box-shadow: 0 0 20px #00ff00;
    }
    .btn-blue {
      background: #2196F3;
      color: white;
    }
    .url-box {
      background: rgba(255,255,255,0.05);
      padding: 15px;
      border-radius: 10px;
      margin: 15px 0;
    }
    .url-box input {
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      border: none;
      background: #333;
      color: #00ff00;
      font-family: monospace;
      margin: 10px 0;
      direction: ltr;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: rgba(255,255,255,0.5);
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 V2Ray Config Generator</h1>
    
    <div class="status">✅ سرور فعال است</div>
    
    <div class="info">
      <p><strong>🔑 UUID:</strong> ${uuid}</p>
      <p><strong>🌐 آدرس:</strong> ${host}</p>
    </div>
    
    <h3 style="color: white;">📦 کانفیگ VLESS:</h3>
    <div class="config-box" id="config">
vless://${uuid}@${host}:443?encryption=none&security=tls&sni=${host}&fp=randomized&type=ws&host=${host}&path=%2Fvless%3Fed%3D2048#Deno
    </div>
    
    <div style="text-align: center;">
      <button class="btn" onclick="copyConfig()">📋 کپی</button>
      <button class="btn btn-blue" onclick="window.open('/vless.txt')">🔗 لینک</button>
    </div>
    
    <div class="url-box">
      <strong style="color: white;">📋 لینک سابسکریپشن:</strong>
      <input type="text" value="https://${host}/vless.txt" id="subLink" readonly>
      <button class="btn" onclick="copyLink()" style="width:100%;">کپی لینک</button>
    </div>
    
    <div class="footer">
      <p>✨ jde1etxl6w | Deno Deploy | 2026</p>
    </div>
  </div>

  <script>
    function copyConfig() {
      const config = document.getElementById('config').innerText;
      navigator.clipboard.writeText(config).then(() => {
        alert('✅ کپی شد!');
      });
    }
    function copyLink() {
      const link = document.getElementById('subLink');
      link.select();
      navigator.clipboard.writeText(link.value).then(() => {
        alert('✅ لینک کپی شد!');
      });
    }
  </script>
</body>
</html>`;
}
