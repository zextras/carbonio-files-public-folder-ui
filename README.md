<!--
SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
SPDX-License-Identifier: AGPL-3.0-only
-->

<div align="center">
  <h1>Carbonio Files Public Folder UI</h1>
</div>

<div align="center">

Files Public Folder module for Zextras Carbonio

[![Contributors][contributors-badge]][contributors]
[![Activity][activity-badge]][activity]
[![License][license-badge]](COPYING)
[![Project][project-badge]][project]
[![Twitter][twitter-badge]][twitter]

</div>

### How to build

#### Setup

- clone this repo
- install the dependencies
```
npm install
```

#### Dev Mode

```
npm run dev
```

#### Preview Mode

```
npm run preview
```
To proxy requests to an existing Carbonio installation, create a `.env.preview.local` file as the following

```dotenv
# leave empty to use msw
HOST=host.example.com:port
# set to development to use msw; leave empty to use proxy
NODE_ENV=
```

Note: preview mode uses dist folder to serve files over local server.
It does not re-create the build on changes.

#### Build

```
npm run build
```

## License
Carbonio Files Public Folder UI - Web client for Zextras Carbonio Files module

Copyright (C) 2023 Zextras <https://www.zextras.com>

This program is free software: you can redistribute it and/or modify it
under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, version 3 only of the License.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see [Licenses - GNU Project - Free
Software Foundation](https://www.gnu.org/licenses/licenses.html
"https://www.gnu.org/licenses/licenses.html")

See [COPYING](COPYING) file for the project license details

See [THIRDPARTIES](THIRDPARTIES) file for other licenses details

### Copyright notice

All non-software material (such as, for example, names, images, logos, sounds) is owned by Zextras s.r.l. and is licensed under [CC-BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/).

Where not specified, all source files owned by Zextras s.r.l. are licensed under AGPL-3.0-only

[contributors-badge]: https://img.shields.io/github/contributors/zextras/carbonio-files-public-folder-ui "Contributors"
[contributors]: https://github.com/zextras/carbonio-files-public-folder-ui/graphs/contributors "Contributors"
[activity-badge]: https://img.shields.io/github/commit-activity/m/zextras/carbonio-files-public-folder-ui "Activity"
[activity]: https://github.com/zextras/carbonio-files-public-folder-ui/pulse "Activity"
[license-badge]: https://img.shields.io/badge/license-AGPL%203-green "License AGPL 3"
[project-badge]: https://img.shields.io/badge/project-carbonio-informational "Project Carbonio"
[project]: https://www.zextras.com/carbonio/ "Project Carbonio"
[twitter-badge]: https://img.shields.io/twitter/follow/zextras?style=social&logo=twitter "Follow on Twitter"
[twitter]: https://twitter.com/intent/follow?screen_name=zextras "Follow Zextras on Twitter"
