// @flow
import * as React from 'react';

import Box from '../Box';
import Link from '../Link';

type RegularT = {|
  value: string,
  type: '',
  color?: string,
  colorType?: 'start' | 'end',
|};

type BoldT = {|
  ...RegularT,
  type: 'bold',
|};

type LinkT = {|
  ...RegularT,
  type: 'link',
  href: string,
  newTab?: 'true' | 'false',
  variant?: 'regular' | 'underline',
|};

type NewLineT = {|
  ...RegularT,
  type: 'new-line',
|};

const bold = '**';
const linkStart = '[';
const linkMid = ']((';
const linkEnd = '))';
const colorStart = ':';
const colorEnd = '::';

type SplitT = Array<RegularT | BoldT | LinkT | NewLineT>;

const findLinks = (split, underlineDefault: boolean) => split.reduce((acc, cur: any) => {
  const hasLink = cur.value.indexOf(linkMid);
  if (hasLink > -1
      && cur.value.indexOf(linkStart) < hasLink
      && cur.value.indexOf(linkEnd) > hasLink) {
    const start = cur.value.substring(0, cur.value.indexOf(linkStart));
    const linkText = cur.value.substring(cur.value.indexOf(linkStart) + linkStart.length, hasLink);
    const linkAttributes = cur.value.substring(hasLink + linkMid.length, cur.value.indexOf(linkEnd)).split('|');
    const end = cur.value.substring(cur.value.indexOf(linkEnd) + linkEnd.length);
    return [
      ...acc,
      {
        value: start,
        type: '',
      },
      {
        value: linkText,
        type: 'link',
        href: linkAttributes[0],
        newTab: linkAttributes[1],
        variant: linkAttributes[2] ?? (underlineDefault ? 'underline' : undefined),
      },
      ...findLinks([{ value: end, type: '' }], underlineDefault),
    ];
  }

  return [
    ...acc,
    cur,
  ];
}, []);

const findColors = (split): SplitT => {
  const totalColorSplits = [];
  const newSplit = split.reduce((acc, cur) => {
    const { value } = cur;
    const index = [];
    for (let i = 0, len = value.length; i < len; i++) {
      const char = value.charAt(i);
      if (char === colorStart) {
        index.push(i);
      }
    }

    // If there is more than one instance of `:` then we should start doing evaluation
    if (index.length > 1) {
      const colorSplits: Array<{|
        color?: string,
        start: number,
        end: number,
        type: 'start' | 'end',
      |}> = [];
      let range = 0;
      while (range < index.length) {
        if (value.substring(index[range], index[range + 1] + 1) === colorEnd
            && totalColorSplits[totalColorSplits.length - 1].type === 'start') {
          const obj = {
            color: totalColorSplits[totalColorSplits.length - 1].color,
            start: index[range],
            end: index[range + 1] + 1,
            type: 'end',
          };
          colorSplits.push(obj);
          totalColorSplits.push(obj);
          range += 2;
        } else if (value.substring(index[range], index[range + 1] + 1).indexOf(' ') === -1) {
          const obj = {
            color: value.substring(index[range] + 1, index[range + 1]),
            start: index[range],
            end: index[range + 1] + 1,
            type: 'start',
          };
          colorSplits.push(obj);
          totalColorSplits.push(obj);
          range += 2;
        } else {
          range += 1;
        }
      }

      const splitArr: SplitT = [];
      let valueCount = 0;
      let colorSplitCount = 0;
      while (valueCount < value.length) {
        if (colorSplits[colorSplitCount]) {
          const a = value.substring(
            valueCount,
            colorSplits[colorSplitCount].start,
          );
          const b = value.substring(
            colorSplits[colorSplitCount].start,
            colorSplits[colorSplitCount].end,
          );
          splitArr.push({
            value: a,
            type: '',
          });
          splitArr.push({
            value: b,
            type: '',
            color: colorSplits[colorSplitCount].color,
            colorType: colorSplits[colorSplitCount].type,
          });
          valueCount = colorSplits[colorSplitCount].end;
        } else {
          const a = value.substring(valueCount);
          splitArr.push({
            value: a,
            type: '',
          });
          valueCount = value.length;
        }
        colorSplitCount += 1;
      }

      return [
        ...acc,
        ...splitArr,
      ];
    }
    return [
      ...acc,
      cur,
    ];
  }, []);
  return newSplit;
};

const findNewLine = (split: SplitT): SplitT => (
  split.reduce((acc, cur) => {
    if (cur.value.indexOf('\n') > -1) {
      const s = cur.value.split('\n');
      return [
        ...acc,
        ...s.reduce((a, c, i) => {
          if (i === 0) {
            return [
              ...a,
              {
                value: c,
                type: '',
              },
            ];
          }
          return [
            ...a,
            {
              value: '',
              type: 'new-line',
            },
            {
              value: c,
              type: '',
            },
          ];
        }, []),
      ];
    }
    return [
      ...acc,
      cur,
    ];
  }, [])
);

const addBold = (obj, i) => <b key={i}>{obj.value}</b>;

const addLink = (obj: LinkT, i) => (
  <Link
    key={i}
    href={obj.href}
    newTab={obj.newTab === 'true'}
    variant={obj.variant}
  >
    {obj.value}
  </Link>
);

export default (
  child: string,
  options: {|
    underline: boolean,
  |},
): Array<React.Node> | React.Node => {
  const boldSplit = child.split(bold).reduce((acc, cur, index, array) => {
    const shouldBold = index % 2 === 1;
    if (shouldBold) {
      if (cur.length === 0) {
        return [
          ...acc,
          {
            value: '****',
            type: '',
          },
        ];
      }
      if (index === array.length - 1) {
        return [
          ...acc,
          {
            value: `**${cur}`,
            type: '',
          },
        ];
      }
    }

    return [
      ...acc,
      {
        value: cur,
        type: shouldBold ? 'bold' : '',
      },
    ];
  }, []);
  const linkSplit = findLinks(boldSplit, options.underline);
  const split = findNewLine(findColors(linkSplit));

  if (split.length === 1) return child;

  const newChild: Array<React.Node> = [];
  let index = 0;
  while (index < split.length) {
    const obj = split[index];
    if (obj.colorType === 'start' && obj.color) {
      const partialSplit = split.slice(index);
      const nextEndIndex = partialSplit.findIndex((o) => o.colorType === 'end');
      if (nextEndIndex > -1) {
        const innerElements = partialSplit.slice(1, nextEndIndex);
        newChild.push(
          <Box
            key={index}
            color={obj.color}
            style={{ display: 'inline' }}
          >
            {innerElements.map((o, i) => {
              if (o.type === 'bold') {
                return addBold(o, i);
              }
              if (o.type === 'link') {
                return addLink(o, i);
              }
              return o.value;
            })}
          </Box>,
        );
        index += (innerElements.length + 2);
      } else {
        newChild.push(obj.value);
        index += 1;
      }
    } else if (obj.type === 'bold') {
      newChild.push(addBold(obj, index));
      index += 1;
    } else if (obj.type === 'link') {
      newChild.push(addLink(obj, index));
      index += 1;
    } else if (obj.type === 'new-line') {
      newChild.push(<br key={index} />);
      index += 1;
    } else {
      newChild.push(obj.value);
      index += 1;
    }
  }
  return newChild;
};
