/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export default ['$parse', ($parse) => {
    return ($scope, $element, $attrs) => {
        const parsedExpr = $parse($attrs.igniteOnFocusOut);

        const handlerCheckFocusOut = (FocusClick) => {
            if ($element.find(FocusClick.target).length)
                return;

            $scope.$evalAsync(() => parsedExpr($scope));
        };

        window.addEventListener('click', handlerCheckFocusOut, true);
        window.addEventListener('focusin', handlerCheckFocusOut, true);

        $scope.$on('$destroy', () => {
            window.removeEventListener('click', handlerCheckFocusOut, true);
            window.removeEventListener('focusin', handlerCheckFocusOut, true);
        });
    };
}];
