/**
 * Copyright 2023 LINE Corporation
 *
 * LINE Corporation licenses this file to you under the Apache License,
 * version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at:
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
class PathV3 {
  private static instance: PathV3 | null;
  public static get Instance(): PathV3 {
    return this.instance ?? (this.instance = new this());
  }

  private readonly basePath = '/web';
  private withBase(path: string) {
    return `${this.basePath}${path}`;
  }

  readonly CREATE_TENANT = this.withBase('/tenant/create');
  readonly SIGN_IN = this.withBase('/auth/sign-in');
  readonly SIGN_UP = this.withBase('/auth/sign-up');
  readonly PASSWORD_RESET = this.withBase('/auth/reset-password');
  readonly MAIN = this.withBase('/main');
  readonly CREATE_PROJECT = this.withBase('/main/project/create');
  readonly CREATE_PROJECT_COMPLETE = this.withBase('/main/project/create-complete');
  readonly CREATE_CHANNEL = this.withBase('/main/project/[projectId]/channel/create');
  readonly CREATE_CHANNEL_COMPLETE = this.withBase('/main/project/[projectId]/channel/create-complete');

  get PROJECT_MAIN() {
    return this.DASHBOARD;
  }
  readonly DASHBOARD = this.withBase('/main/project/[projectId]/dashboard');
  readonly FEEDBACK = this.withBase('/main/project/[projectId]/feedback');
  readonly ISSUE = this.withBase('/main/project/[projectId]/issue');
  readonly SETTINGS = this.withBase('/main/project/[projectId]/settings');

  isErrorPage(pathname: string) {
    return pathname === this.withBase('/404') || pathname === this.withBase('/403');
  }

  isProtectPage(pathname: string) {
    return pathname.startsWith(this.withBase('/main'));
  }

  hasSideNav(pathname: string) {
    return pathname.startsWith(this.withBase('/main/project/[projectId]'));
  }
}

export const Path = PathV3.Instance;
