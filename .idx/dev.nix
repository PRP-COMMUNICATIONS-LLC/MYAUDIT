{pkgs}: {
  channel = "stable-24.05";
  # Which packages should be installed in the workspace?
  packages = [
    pkgs.nodejs_20
    pkgs.firebase-tools
    pkgs.gh # GitHub CLI for managing your repo
  ];

  # Sets environment variables in the workspace
  env = {
    # You can preview your API key here for dev, 
    # but use Firebase secrets for production!
    GEMINI_API_KEY = "your_key_here";
  };

  idx = {
    # Search for the extensions you want to use
    extensions = [
      "astro-build.astro-vscode"
      "esbenp.prettier-vscode"
      "bradlc.vscode-tailwindcss" # Essential for your Tailwind styling
    ];

    # Workspace lifecycle hooks
    previews = {
      enable = true;
      previews = {
        # Desktop Preview
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0"];
          manager = "web";
        };
        # Mobile Preview (Simulated)
        mobile = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}
