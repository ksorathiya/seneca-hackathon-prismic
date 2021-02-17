/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const logoImgStyle = {
  width:"500%",
  height:"500%" 
}

export default function IconLogo({
  backgroundColor = 'white',
  foregroundColor = 'var(--accents-8)',
  ...props
}) {
  return (
      <img 
        style={logoImgStyle}
        src="/seneca-logo.png" alt="Seneca logo" data-emptytext="Logo" 
      />
  );
}
