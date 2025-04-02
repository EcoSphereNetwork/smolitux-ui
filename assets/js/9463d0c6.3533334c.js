"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5442],{463:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>c,default:()=>h,frontMatter:()=>l,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"development/contributing","title":"Contributing to the Project","description":"First off, thank you for considering contributing to this project! It\'s people like you that make this project such a great tool.","source":"@site/docs/development/contributing.md","sourceDirName":"development","slug":"/development/contributing","permalink":"/smolitux-ui/docs/development/contributing","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/development/contributing.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Smolitux UI Component Test Status Report","permalink":"/smolitux-ui/docs/development/component-status"},"next":{"title":"Acknowledgements","permalink":"/smolitux-ui/docs/development/credits"}}');var t=s(4848),r=s(8453);const l={},c="Contributing to the Project",o={},d=[{value:"Code of Conduct",id:"code-of-conduct",level:2},{value:"How Can I Contribute?",id:"how-can-i-contribute",level:2},{value:"Reporting Bugs",id:"reporting-bugs",level:3},{value:"Suggesting Enhancements",id:"suggesting-enhancements",level:3},{value:"Pull Requests",id:"pull-requests",level:3},{value:"Development Process",id:"development-process",level:2},{value:"Commit Message Guidelines",id:"commit-message-guidelines",level:2},{value:"Code Style",id:"code-style",level:2},{value:"Testing",id:"testing",level:2},{value:"Documentation",id:"documentation",level:2},{value:"Questions?",id:"questions",level:2}];function a(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"contributing-to-the-project",children:"Contributing to the Project"})}),"\n",(0,t.jsx)(n.p,{children:"First off, thank you for considering contributing to this project! It's people like you that make this project such a great tool."}),"\n",(0,t.jsx)(n.h2,{id:"code-of-conduct",children:"Code of Conduct"}),"\n",(0,t.jsx)(n.p,{children:"This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code."}),"\n",(0,t.jsx)(n.h2,{id:"how-can-i-contribute",children:"How Can I Contribute?"}),"\n",(0,t.jsx)(n.h3,{id:"reporting-bugs",children:"Reporting Bugs"}),"\n",(0,t.jsx)(n.p,{children:"Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Use a clear and descriptive title"}),"\n",(0,t.jsx)(n.li,{children:"Describe the exact steps which reproduce the problem"}),"\n",(0,t.jsx)(n.li,{children:"Provide specific examples to demonstrate the steps"}),"\n",(0,t.jsx)(n.li,{children:"Describe the behavior you observed after following the steps"}),"\n",(0,t.jsx)(n.li,{children:"Explain which behavior you expected to see instead and why"}),"\n",(0,t.jsx)(n.li,{children:"Include screenshots if possible"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"suggesting-enhancements",children:"Suggesting Enhancements"}),"\n",(0,t.jsx)(n.p,{children:"Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Use a clear and descriptive title"}),"\n",(0,t.jsx)(n.li,{children:"Provide a step-by-step description of the suggested enhancement"}),"\n",(0,t.jsx)(n.li,{children:"Provide specific examples to demonstrate the steps"}),"\n",(0,t.jsx)(n.li,{children:"Describe the current behavior and explain which behavior you expected to see instead"}),"\n",(0,t.jsx)(n.li,{children:"Explain why this enhancement would be useful"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"pull-requests",children:"Pull Requests"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Fork the repo and create your branch from ",(0,t.jsx)(n.code,{children:"main"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"git checkout -b feature/my-feature\n# or\ngit checkout -b fix/my-fix\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"If you've added code that should be tested, add tests."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"If you've changed APIs, update the documentation."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Ensure the test suite passes:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"poetry run pytest\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Make sure your code follows the style guidelines:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"poetry run black .\npoetry run ruff check .\npoetry run mypy .\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Commit your changes using a descriptive commit message that follows our commit message conventions:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'git commit -m "feat: add amazing feature"\n# or\ngit commit -m "fix: resolve issue with feature"\n'})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"development-process",children:"Development Process"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Setup Development Environment"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# Clone the repository\ngit clone https://github.com/yourusername/project.git\ncd project\n\n# Install dependencies\npoetry install\n\n# Setup pre-commit hooks\npoetry run pre-commit install\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Create Feature Branch"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"git checkout -b feature/my-feature\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Make Changes"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Write your code"}),"\n",(0,t.jsx)(n.li,{children:"Add tests"}),"\n",(0,t.jsx)(n.li,{children:"Update documentation"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Test Your Changes"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# Run tests\npoetry run pytest\n\n# Check code style\npoetry run black .\npoetry run ruff check .\npoetry run mypy .\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Commit Your Changes"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'git add .\ngit commit -m "feat: add amazing feature"\n'})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Push and Create PR"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"git push origin feature/my-feature\n"})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"commit-message-guidelines",children:"Commit Message Guidelines"}),"\n",(0,t.jsxs)(n.p,{children:["We follow the ",(0,t.jsx)(n.a,{href:"https://www.conventionalcommits.org/",children:"Conventional Commits"})," specification:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"feat:"})," - A new feature"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"fix:"})," - A bug fix"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"docs:"})," - Documentation only changes"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"style:"})," - Changes that do not affect the meaning of the code"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"refactor:"})," - A code change that neither fixes a bug nor adds a feature"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"perf:"})," - A code change that improves performance"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"test:"})," - Adding missing tests or correcting existing tests"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"chore:"})," - Changes to the build process or auxiliary tools"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"code-style",children:"Code Style"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Python code follows ",(0,t.jsx)(n.a,{href:"https://black.readthedocs.io/",children:"Black"})," code style"]}),"\n",(0,t.jsx)(n.li,{children:"Use type hints for all function arguments and return values"}),"\n",(0,t.jsx)(n.li,{children:"Document all public functions and classes"}),"\n",(0,t.jsx)(n.li,{children:"Keep functions focused and small"}),"\n",(0,t.jsx)(n.li,{children:"Write meaningful variable and function names"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"testing",children:"Testing"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Write unit tests for all new code"}),"\n",(0,t.jsx)(n.li,{children:"Maintain or improve code coverage"}),"\n",(0,t.jsx)(n.li,{children:"Include integration tests where appropriate"}),"\n",(0,t.jsx)(n.li,{children:"Test edge cases and error conditions"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"documentation",children:"Documentation"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Update README.md with any necessary changes"}),"\n",(0,t.jsx)(n.li,{children:"Add docstrings to all public functions and classes"}),"\n",(0,t.jsx)(n.li,{children:"Update API documentation when changing interfaces"}),"\n",(0,t.jsx)(n.li,{children:"Include examples in documentation"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"questions",children:"Questions?"}),"\n",(0,t.jsx)(n.p,{children:"Feel free to ask for help in:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"GitHub Issues"}),"\n",(0,t.jsx)(n.li,{children:"Pull Request comments"}),"\n",(0,t.jsx)(n.li,{children:"Project Discord channel"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Thank you for contributing! \ud83c\udf89"})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>c});var i=s(6540);const t={},r=i.createContext(t);function l(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);